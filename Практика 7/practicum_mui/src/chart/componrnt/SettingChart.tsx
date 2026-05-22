import { FormControl, FormLabel, FormControlLabel, Checkbox, Stack, Divider, RadioGroup, Radio } from '@mui/material';

type tSeries = {
    'Максимальный рейтинг': boolean,
    'Средний рейтинг': boolean,
    'Минимальный рейтинг': boolean,
}

type SettingProps = {
    series: tSeries;
    setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
    isBar: boolean;
    setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingMovieChart({ series, setSeries, isBar, setIsBar }: SettingProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeries({ ...series, [event.target.name]: event.target.checked });
    };

    return (
        <Stack direction="row" spacing={4} sx={{ mt: 4, mb: 4, justifyContent: 'center' }} divider={<Divider orientation="vertical" flexItem />}>
            <FormControl>
                <FormLabel>Вид графика:</FormLabel>
                <RadioGroup value={isBar ? "bar" : "line"} onChange={(e) => setIsBar(e.target.value === "bar")}>
                    <FormControlLabel value="bar" control={<Radio />} label="Гистограмма" />
                    <FormControlLabel value="line" control={<Radio />} label="Линейный" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Показать показатели:</FormLabel>
                {Object.keys(series).map((key) => (
                    <FormControlLabel
                        key={key}
                        control={<Checkbox checked={series[key as keyof tSeries]} onChange={handleChange} name={key} />}
                        label={key.toLowerCase()}
                    />
                ))}
            </FormControl>
        </Stack>
    );
}