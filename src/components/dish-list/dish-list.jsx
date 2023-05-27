import { DishListItem } from "../dish-list-item";

export const DishList = ({ dishes, editAction, removeAction }) => {
  const listItems = dishes.map((dish, i) =>
    <DishListItem key={`dish-${i}`} item={dish} editAction={editAction} removeAction={removeAction} />
  );

  return listItems
};
