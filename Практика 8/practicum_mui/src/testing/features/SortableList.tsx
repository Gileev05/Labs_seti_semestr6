import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import List from '@mui/material/List';
import { SortableItem } from "../components/SortableItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setList } from "./quizSlice";

interface ComponentProps {
    index: number,
    answers: string[];
}

function SortableList({ index }: ComponentProps ) {
    const dispatch = useDispatch();
    const draggedItems = useSelector((state: RootState) => state.lists.lists[index]) || [];

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = draggedItems.indexOf(String(active.id));
            const newIndex = draggedItems.indexOf(String(over.id));
            const newList = arrayMove(draggedItems, oldIndex, newIndex);
            dispatch(setList({ index, items: newList }));
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={draggedItems} strategy={verticalListSortingStrategy}>
                <List>
                    {draggedItems.map((item) => (
                        <SortableItem key={item} item={item} />
                    ))}
                </List>
            </SortableContext>
        </DndContext>
    );
}

export default SortableList;