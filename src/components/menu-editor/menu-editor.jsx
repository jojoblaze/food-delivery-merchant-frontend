import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDishes, removeDish } from "../../features/menu/menu.actions";
import { selectAllDishes } from "../../features/menu/menu.dataSlice";
import { DishList } from "../dish-list";
import { useNavigate } from "react-router";

import { ConfirmDialog } from "../shared/confirm-dialog/confirm-dialog";
import { InfoDialog } from "../shared/info-dialog";

export const MenuEditor = () => {
  const dispatch = useDispatch();
  const dishes = useSelector(selectAllDishes);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDishes());

    //   return () => {
    //     second
    //   }
  }, []);

  const onEdit = (item) => navigate(`dish/${item.id}`);

  const [dialogStatus, setDialogStatus] = useState({
    showDeleteConfirm: false,
    showDeleteSuccess: false,
  });

  const [selectedItem, setSelectedItem] = useState();

  const onCreate = () => {
    navigate("dish/create");
  };

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
      <button className="button" onClick={onCreate}>
        Create
      </button>
      <DishList dishes={dishes} editAction={onEdit} removeAction={onRemove} />

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
