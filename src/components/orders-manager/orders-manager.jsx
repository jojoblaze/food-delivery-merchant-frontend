import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDishes, removeDish } from "../../features/menu/menu.actions";
import { selectAllDishes } from "../../features/menu/menu.dataSlice";
import { useNavigate } from "react-router";
import { HubConnectionBuilder } from "@microsoft/signalr";

import { ConfirmDialog } from "../shared/confirm-dialog/confirm-dialog";
import { InfoDialog } from "../shared/info-dialog";
import { OrdersList } from "../orders-list";
import { useRef } from "react";

export const OrdersManager = () => {
  const dispatch = useDispatch();
  const dishes = useSelector(selectAllDishes);
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(fetchDishes());

  //   //   return () => {
  //   //     second
  //   //   }
  // }, []);

  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_WEBSOCKET_URL}/orders`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  const [orders, _setOrders] = useState([]);
  const ordersRef = useRef(orders);
  const setOrders = (data) => {
    ordersRef.current = data;
    _setOrders(data);
  };

  const takeOrder = (message) => {
    console.log("RECEIVED MESSAGE ", message);
    const compiledDishes = message.dishes.map((orderDish) => {
      const dish = dishes.find((d) => d.id == orderDish.dishId);
      return { ...dish, quantity: orderDish.quantity };
    });
    const compiledOrder = { ...message, dishes: compiledDishes };
    setOrders([...(ordersRef.current || []), compiledOrder]);
  };

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          connection.on("TakeOrder", takeOrder);
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const onEdit = (item) => navigate(`dish/${item.id}`);

  const [dialogStatus, setDialogStatus] = useState({
    showDeleteConfirm: false,
    showDeleteSuccess: false,
  });

  const [selectedItem, setSelectedItem] = useState();

  // const onCreate = () => {
  //   navigate("dish/create");
  // };

  const onRemove = (item) => {
    console.log("REMOVE CLICK!");
    setSelectedItem(item);
    setDialogStatus({ ...dialogStatus, showDeleteConfirm: true });
  };

  const onRemoveConfirm = async () => {
    console.log("REMOVE CONFIRMED!");
    const result = await dispatch(removeDish(selectedItem.id)).unwrap();
    if (result === true) {
      console.log("dish removed!");
      setDialogStatus({
        ...dialogStatus,
        showDeleteConfirm: false,
        showDeleteSuccess: true,
      });
    }
  };

  const onRemoveCancel = () => {
    console.log("REMOVE CANCELED!");
    setDialogStatus({ ...dialogStatus, showDeleteConfirm: false });
  };

  return (
    <>
      {/* <pre>{JSON.stringify(dishes, null, 1)}</pre> */}
      {/* <button className="button" onClick={onCreate}>
        Create
      </button> */}
      <OrdersList orders={orders} editAction={onEdit} removeAction={onRemove} />

      <ConfirmDialog
        show={dialogStatus.showDeleteConfirm}
        message={"Are you sure?"}
        okText={`Ok`}
        okAction={onRemoveConfirm}
        cancelText={`Cancel`}
        cancelAction={onRemoveCancel}
      />
      <InfoDialog
        show={dialogStatus.showDeleteSuccess}
        message={"Dish removed successfully."}
        okText={`Ok`}
        okAction={() =>
          setDialogStatus({ ...dialogStatus, showDeleteSuccess: false })
        }
      />
    </>
  );
};
