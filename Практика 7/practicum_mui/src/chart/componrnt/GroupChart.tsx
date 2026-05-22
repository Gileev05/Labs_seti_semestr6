import { BarChart, LineChart } from '@mui/x-charts';
import { Container } from '@mui/material';
import React from "react";
import SettingMovieChart from "./SettingChart";

export default function MovieGroupChart({ data }: { data: any[] }) {
    const [isBar, setIsBar] = React.useState(true);
    const [series, setSeries] = React.useState({
        'Максимальный рейтинг': true,
        'Средний рейтинг': true,
        'Минимальный рейтинг': false,
    });

    const seriesConfig = Object.entries(series)
        .filter(([_, active]) => active)
        .map(([label]) => ({
            dataKey: label,
            label: label,
        }));

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {isBar ? (
                <BarChart
                    dataset={data}
                    xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                    series={seriesConfig}
                    height={400}
                />
            ) : (
                <LineChart
                    dataset={data}
                    xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                    series={seriesConfig}
                    height={400}
                />
            )}
            <SettingMovieChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar} />
        </Container>
    );
}