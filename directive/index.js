import Ripple from './ripple/index'
import clickOutside from './clickOutSide/index'
import Title from "renusify/directive/title";
import Scroll from "renusify/directive/scroll";
import Sortable from "renusify/directive/sortable";
import parallax from "renusify/directive/parallax";
import Animate from "renusify/directive/animate";

const list={
  'ripple':Ripple,
  'click-outside':clickOutside,
  'title':Title,
  'scroll':Scroll,
  'sortable':Sortable,
  'parallax':parallax,
  'animate':Animate,
}
export const registers = (app,directives) => {
  directives.forEach((item)=>{
    app.directive(item, list[item])
  })
}
