export class MenuBuilder {
    constructor() {
        this.pathMap = new Map();
        this.addOrder = []; // Track order of addition at root level
    }

    addPath(path) {
        const normalizedPath = path.replace(/^\.\//, '').replace(/\/index\.js$/, '');
        const parts = normalizedPath.split('/');

        let currentLevel = this.pathMap;
        let currentAddOrder = this.addOrder; // Track order at current level
        let fullPath = '';

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const partName = part.replace(/([A-Z])/g, ' $1').replace(/\.js$/, '').toLowerCase().trim();
            const partKey = part.replace(/\.js$/, '');
            fullPath += (i > 0 ? '/' : '') + partKey;

            if (i === parts.length - 1) {
                // Leaf node (file)
                if (!currentLevel.has(partKey)) {
                    currentLevel.set(partKey, {
                        type: 'file',
                        name: partName,
                        path: fullPath,
                        isIndex: path.endsWith('/index.js') || path.endsWith('index.js'),
                        addOrder: currentAddOrder.length // Store addition order
                    });
                    // Track addition order
                    currentAddOrder.push(partKey);
                } else {
                    const existing = currentLevel.get(partKey);
                    if ((path.endsWith('/index.js') || path.endsWith('index.js')) && existing.type === 'dir') {
                        existing.hasIndex = true;
                        existing.indexPath = fullPath;
                        // Don't update addOrder for existing directory with index
                    }
                }
            } else {
                // Directory
                if (!currentLevel.has(partKey)) {
                    const newDir = {
                        type: 'dir',
                        name: partName,
                        children: new Map(),
                        addOrder: currentAddOrder.length, // Store addition order
                        childAddOrder: [], // Track order of children
                        hasIndex: false
                    };
                    currentLevel.set(partKey, newDir);
                    // Track addition order
                    currentAddOrder.push(partKey);
                } else {
                    const existing = currentLevel.get(partKey);
                    if (existing.type === 'file') {
                        // Convert file to directory
                        const newDir = {
                            type: 'dir',
                            name: existing.name,
                            children: new Map(),
                            addOrder: existing.addOrder, // Preserve original add order
                            childAddOrder: [], // Track order of children
                            hasIndex: false
                        };
                        currentLevel.set(partKey, newDir);

                        // Move existing file into children
                        const dir = currentLevel.get(partKey);
                        dir.children.set(partKey, {
                            type: 'file',
                            name: existing.name,
                            path: existing.path,
                            isIndex: false,
                            addOrder: 0 // First child gets order 0
                        });
                        dir.childAddOrder.push(partKey);
                    }
                }

                const dir = currentLevel.get(partKey);
                if (!dir.children) {
                    dir.children = new Map();
                    dir.childAddOrder = [];
                }
                currentLevel = dir.children;
                currentAddOrder = dir.childAddOrder; // Use childAddOrder for this level
            }
        }
    }

    build(typ = 'component') {
        const convertMapToArray = (map, addOrder) => {
            const result = [];

            // Sort items by their addOrder property
            const sortedEntries = Array.from(map.entries())
                .sort(([keyA, valueA], [keyB, valueB]) => {
                    // Use addOrder if available, otherwise fall back to insertion order
                    const orderA = valueA.addOrder !== undefined ? valueA.addOrder : Infinity;
                    const orderB = valueB.addOrder !== undefined ? valueB.addOrder : Infinity;
                    return orderA - orderB;
                });

            for (const [key, value] of sortedEntries) {
                if (value.type === 'file') {
                    result.push({
                        name: value.name,
                        to: {
                            name: 'pages',
                            params: {
                                lang: 'en',
                                path: `${typ}-${value.path.replace(/\//g, '-')}`
                            }
                        }
                    });
                } else if (value.type === 'dir') {
                    const children = value.children && value.childAddOrder
                        ? convertMapToArray(value.children, value.childAddOrder)
                        : [];

                    // Check if we should create a group or just show as individual item
                    if (children.length > 0) {
                        // Find index file (child with same name)
                        const indexChildIndex = children.findIndex(child => child.name === value.name);

                        if (indexChildIndex !== -1) {
                            const indexChild = children[indexChildIndex];
                            const otherChildren = children.filter((_, idx) => idx !== indexChildIndex);

                            if (otherChildren.length > 0) {
                                result.push({
                                    name: value.name,
                                    childs: [
                                        {
                                            name: value.name,
                                            to: indexChild.to
                                        },
                                        ...otherChildren
                                    ]
                                });
                            } else {
                                // Just the index file, no need for grouping
                                result.push(indexChild);
                            }
                        } else if (children.length === 1 && children[0].name === value.name) {
                            // Single child with same name (flatten)
                            result.push(children[0]);
                        } else {
                            // Group all children
                            result.push({
                                name: value.name,
                                childs: children
                            });
                        }
                    } else if (value.hasIndex && value.indexPath) {
                        // Directory with only an index file
                        result.push({
                            name: value.name,
                            to: {
                                name: 'pages',
                                params: {
                                    lang: 'en',
                                    path: `${typ}-${value.indexPath.replace(/\//g, '-')}`
                                }
                            }
                        });
                    } else {
                        // Empty directory
                        result.push({
                            name: value.name,
                            childs: []
                        });
                    }
                }
            }

            return result;
        };

        return convertMapToArray(this.pathMap, this.addOrder);
    }

    // Simplified version that preserves addition order
    buildSimple(typ = 'component') {
        const convertMapToArray = (map, addOrder) => {
            // Sort by addOrder
            const sortedEntries = Array.from(map.entries())
                .sort(([keyA, valueA], [keyB, valueB]) => {
                    const orderA = valueA.addOrder !== undefined ? valueA.addOrder : Infinity;
                    const orderB = valueB.addOrder !== undefined ? valueB.addOrder : Infinity;
                    return orderA - orderB;
                });

            return sortedEntries.map(([key, value]) => {
                if (value.type === 'file') {
                    return {
                        name: value.name,
                        to: {
                            name: 'pages',
                            params: {
                                lang: 'en',
                                path: `${typ}-${value.path.replace(/\//g, '-')}`
                            }
                        }
                    };
                }

                // Directory
                const children = value.children && value.childAddOrder
                    ? convertMapToArray(value.children, value.childAddOrder)
                    : [];

                if (value.hasIndex && value.indexPath) {
                    const baseItem = {
                        name: value.name,
                        to: {
                            name: 'pages',
                            params: {
                                lang: 'en',
                                path: `${typ}-${value.indexPath.replace(/\//g, '-')}`
                            }
                        }
                    };

                    return children.length > 0
                        ? {...baseItem, childs: children}
                        : baseItem;
                }

                return children.length > 0
                    ? {name: value.name, childs: children}
                    : {name: value.name, childs: []};
            });
        };

        return convertMapToArray(this.pathMap, this.addOrder);
    }
}