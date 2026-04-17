import { useState, useEffect } from 'react';

const Sort = (props) => {
    const { fields, onSort} = props;

    const [sortLevel1, setSortLevel1] = useState({ field: '', descending: false });
    const [sortLevel2, setSortLevel2] = useState({ field: '', descending: false });
    const [sortLevel3, setSortLevel3] = useState({ field: '', descending: false });

    const FieldsLevel2 = () => {
        return fields.filter(f => f !== sortLevel1.field);
    };

    const FieldsLevel3 = () => {
        return fields.filter(f => f !== sortLevel1.field && f !== sortLevel2.field);
    };

    useEffect(() => {
        if (!sortLevel1.field && sortLevel2.field) {
            setSortLevel2({ field: '', descending: false });
        }
    }, [sortLevel1.field]);

    useEffect(() => {
        if (!sortLevel2.field && sortLevel3.field) {
            setSortLevel3({ field: '', descending: false });
        }
    }, [sortLevel2.field]);

    const handleSort = () => {
        if (!sortLevel1.field) {
            onSort(null, false);
            return;
        }

        const sortConfig = {
            level1: { field: sortLevel1.field, descending: sortLevel1.descending },
            level2: sortLevel2.field ? { field: sortLevel2.field, descending: sortLevel2.descending } : null,
            level3: sortLevel3.field ? { field: sortLevel3.field, descending: sortLevel3.descending } : null
        };

        onSort(sortConfig);
    };

    const clearSort = () => {
        setSortLevel1({ field: '', descending: false });
        setSortLevel2({ field: '', descending: false });
        setSortLevel3({ field: '', descending: false });
        onSort(null, false);
    };

    return (
        <>
            <p>Первый уровень:
                <select
                    value={sortLevel1.field}
                    onChange={(e) => setSortLevel1(prev => ({ ...prev, field: e.target.value }))}
                >
                    <option value="">Нет</option>
                    {fields.map(field => (
                        <option key={field} value={field}>{field}</option>
                    ))}
                </select>
                <label>
                    <input
                        type="checkbox"
                        checked={sortLevel1.descending}
                        onChange={(e) => setSortLevel1(prev => ({ ...prev, descending: e.target.checked }))}
                        disabled={!sortLevel1.field}
                    />
                    по убыванию?
                </label>
            </p>

            <p>Второй уровень:
                <select
                    value={sortLevel2.field}
                    onChange={(e) => setSortLevel2(prev => ({ ...prev, field: e.target.value }))}
                    disabled={!sortLevel1.field}
                >
                    <option value="">Нет</option>
                    {FieldsLevel2().map(field => (
                        <option key={field} value={field}>{field}</option>
                    ))}
                </select>
                <label>
                    <input
                        type="checkbox"
                        checked={sortLevel2.descending}
                        onChange={(e) => setSortLevel2(prev => ({ ...prev, descending: e.target.checked }))}
                        disabled={!sortLevel2.field}
                    />
                    по убыванию?
                </label>
            </p>

            <p>Третий уровень:
                <select
                    value={sortLevel3.field}
                    onChange={(e) => setSortLevel3(prev => ({ ...prev, field: e.target.value }))}
                    disabled={!sortLevel2.field}
                >
                    <option value="">Нет</option>
                    {FieldsLevel3().map(field => (
                        <option key={field} value={field}>{field}</option>
                    ))}
                </select>
                <label>
                    <input
                        type="checkbox"
                        checked={sortLevel3.descending}
                        onChange={(e) => setSortLevel3(prev => ({ ...prev, descending: e.target.checked }))}
                        disabled={!sortLevel3.field}
                    />
                    по убыванию?
                </label>
            </p>

            <input id="build_sort" type="button" value="Сортировать" onClick={handleSort} />
            <input id="clear_sort" type="button" value="Очистить сортировку" onClick={clearSort} style={{ marginLeft: '10px' }} />
        </>
    );
};

export default Sort;