export default class DateTime {
  constructor($r, langs) {
    this.$r = $r;
    this.format = {
      narrow: {
        weekday: "narrow",
      },
      day: {
        day: "numeric",
      },
      month: {
        month: "short",
      },
      year: {
        year: "numeric",
      },
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      medium: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },
      weekday: {
        weekday: "short",
      },
      long: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
      "date-latin": {
        month: "numeric",
        day: "numeric",
        numberingSystem: "latn",
      },
    };

    this.langs = langs;
  }

  set_lang(name, lang) {
    if (!lang["localizeName"]) {
      console.error(
        "new Lang Must contain localizeName and timeZone (en: {\n" +
          "            first_day:0,\n" +
          "            time_zone_offset:-480,//Standard timezone offset minutes -07:00\n" +
          "            localizeName: 'en-US',\n" +
          "            timeZone: 'America/Los_Angeles'\n" +
          "        })",
      );
      return;
    }
    this.langs[name] = lang;
  }

  set_format(value) {
    Object.assign(this.format, this.format, value);
  }

  formatLocal(value, type = "long", local = null) {
    if (local === null) {
      local = this.$r.lang;
    }
    if (!(local in this.langs)) {
      console.warn(
        "set local:" +
          local +
          ' with this.$dateTime.set_lang("' +
          local +
          '",{\n' +
          '            localizeName: "en-US",\n' +
          "            first_day:0\n" +
          "        })",
      );
      this.langs[local] = {
        localizeName: local,
      };
    }

    let opt = Object.assign({}, this.format[type], this.langs[local]);
    if (!opt.hour12) {
      opt.hour12 = false;
    }
    try {
      return new Intl.DateTimeFormat(
        this.langs[local].localizeName,
        opt,
      ).format(value);
    } catch (e) {
      console.error(e, value);
      return value;
    }
  }

  add_days(date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  add_months(date, months) {
    let currentDate = date;
    for (let i = 0; i < months; i++) {
      const formattedDate = this.formatLocal(currentDate, "date-latin");
      
      let [month, day]=formattedDate.split("/");

      let nextDate = currentDate;
      let targetMonth = null;

      while (true) {
        nextDate = this.add_days(nextDate, 1);
        const nextFormatted = this.formatLocal(nextDate, "date-latin");
        let [month2, day2]= nextFormatted.split("/");

        if (month2 !== month) {
          if (targetMonth === null) {
            targetMonth = month2;
          }

          if (day === day2) {
            currentDate = nextDate;
            break;
          }

          if (month2 !== targetMonth) {
            currentDate = this.add_days(nextDate, -1);
            break;
          }
        }
      }
    }
    return currentDate;
  }
}
