<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-chart
      </h1>
      <div>
        r-chart از کتابخانه
        <a href="https://github.com/apexcharts/apexcharts.js" target="_blank"
        >apexcharts.js</a
        >
        برای نمایش استفاده می کند. لطفا برای اطلاع از تمامی چارت ها و نحوه
        استفاده به سایت
        <a href="https://apexcharts.com" target="_blank">apexcharts</a> مراجعه
        کنید
      </div>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        نمودارهای آسان و زیبا با
        <r-btn readonly size="small"> r-chart</r-btn>
      </p>
    </div>
    <table-props :items="items"></table-props>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "options": {
                "chart": {"type": "area"},
                "fill": {
                    "type": "gradient",
                    "gradient": {
                        "enabled": true,
                        "opacityFrom": 0.7,
                        "opacityTo": .1
                    }
                },
                "markers": {
                    "size": 5,
                    "strokeWidth": 3
                },
                "dataLabels": {
                    "enabled": false
                },
                "series": [
                    {
                        "name": "تعداد",
                        "data": [23,45,63,32,57]
                    },
                    {
                        "name": "قیمت",
                        "data": [1200,2300,400,900,200]
                    }
                ],

                "xaxis": {
                    "categories": [1,2,3,4,5],
                }
            }
}
}'
        template='<r-chart :options="options" ></r-chart>'
    ></r-code-editor>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "options": {
            "chart": {"type": "bar"},
            "series": [
                {
                    "name": "count",
                    "data": [34,56,22,11,67]
                }
            ],
            "plotOptions": {
                "bar": {
                    "distributed": true
                }
            },
            "legend": {"show": false},
            "xaxis": {
                "categories": [1,2,3,4,5]
            }
        }
}
}'
        template='<r-chart :options="options" ></r-chart>'
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "chart",
  data() {
    return {
      items: [
        {
          prop: "options",
          type: "Object",
          default: "null",
          description: "Option می گیرد",
        },
      ],
    };
  },
};
</script>
