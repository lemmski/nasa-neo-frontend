import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useRef, useLayoutEffect } from "react";
import type { LargestNeoQuery } from "./generated/graphql";

am4core.useTheme(am4themes_animated);

type LargestNeoByMonthChartProps = {
  data: LargestNeoQuery;
};

export default function LargestNeoByMonthChart(
  props: LargestNeoByMonthChartProps
) {
  const chart: any = useRef(null);
  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;

    x.data = props.data.largestNearEarthObjectsByMonth
      .filter((item) => item ?? false)
      .map((item: any) => {
        return {
          value: (
            (item.estimated_diameter.kilometers?.estimated_diameter_max +
              item.estimated_diameter.kilometers?.estimated_diameter_min) /
            2
          ).toFixed(2),
          name: item.name,
          date: item.close_approach_data[0].close_approach_date,
        };
      });

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis: any = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "Name: {name} \n Diameter: ~{valueY.value} km";
    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [props.data.largestNearEarthObjectsByMonth]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}
