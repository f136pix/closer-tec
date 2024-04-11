import {
    Box,
    Chip, FilledInput,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent, Theme,
    useTheme
} from "@mui/material";


type IProps = {
    listOptions: any;
    selectedOptions: string[];
    setSelectedOptions: (value: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function MultiSelect(props: IProps) {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof props.selectedOptions>) => {
        const {
            target: {value},
        } = event;
        props.setSelectedOptions(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl sx={{m: 1, width: 300, marginY: 'auto'}}>
            <Select
                sx={{height:43, marginY: 'auto'}}
                displayEmpty={true}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={props.selectedOptions}
                onChange={handleChange}
                input={<FilledInput/>}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <em className={'text-neutral-500'}>All</em>;
                    }
                    return (<Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                    </Box>);
                }}
                MenuProps={MenuProps}
                inputProps={{'aria-label': 'Without label'}}
            >
                <MenuItem disabled value="">
                    <em>All</em>
                </MenuItem>
                {props.listOptions.map((name: any) => (
                    <MenuItem
                        key={name.value}
                        value={name.value}
                        style={getStyles(name.value, props.selectedOptions, theme)}
                    >
                        {name.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default MultiSelect;