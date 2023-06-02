
import { OrderListItem } from "../order-list-item";

export const OrdersList = ({ orders, editAction, removeAction }) => {
  const listItems = orders?.map((order, i) =>
    <OrderListItem key={`dish-${i}`} item={order} editAction={editAction} removeAction={removeAction} />
  );

  return listItems
};
