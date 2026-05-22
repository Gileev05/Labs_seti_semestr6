import { BarChart} from '@mui/x-charts/BarChart';
import Container from '@mui/material/Container';
import React from "react";
import SettingChart from "./SettingChart";
import {LineChart} from "@mui/x-charts";

interface GroupChartProps {
    data: any[];
}

export default function GroupChart({ data }: GroupChartProps) {
    const chartSetting = {
        yAxis: [{label: 'Высота (м)'}],
        height: 400,
    };
    const [series, setSeries] = React.useState({
        'Максимальная высота': true,
        'Средняя высота': false,
        'Минимальная высота': false,
    });

    const active = Object.values(series).filter(Boolean).length;

    const [isBar, setIsBar] = React.useState(true);

    let seriesY = Object.entries(series)
        .filter(item => item[1])
        .map(item => {
            return {
                "dataKey": item[0],
                "label": item[0],
                barLabel: active === 1 ?(item: any) => `${item.value ?? 0}` : undefined
            }
        });

    return (
        <Container maxWidth="lg">

            {isBar ? (
                <BarChart
                    dataset={data}
                    xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                    series={seriesY}
                    slotProps={{
                        legend: {
                            position: { vertical: 'bottom', horizontal: 'center' },
                        },
                    }}
                    {...chartSetting}
                />
            ) : (
                <LineChart
                    dataset={data}
                    xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                    series={seriesY}
                    slotProps={{
                        legend: {
                            position: { vertical: 'bottom', horizontal: 'center' },
                        },
                    }}
                    {...chartSetting}
                />
            )}

            <SettingChart
                series={ series }
                setSeries={ setSeries }
                isBar={isBar}
                setIsBar={setIsBar}/>
        </Container>
    )
};