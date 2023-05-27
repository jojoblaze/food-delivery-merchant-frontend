import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { createDish, fetchDish, updateDish } from "../../features/menu/menu.actions";
import { InfoDialog } from "../shared/info-dialog";

export const DishEditor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dishId } = useParams();
  const [item, setItem] = useState({ name: null, summary: null, price: null });

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const i = await dispatch(fetchDish(dishId)).unwrap();
      setItem(i);
    }
    if (dishId !== undefined) fetchData();
  }, []);

  const [dialogStatus, setDialogStatus] = useState({
    showUpdateSuccess: false,
  });

  const onSave = async () => {
    console.log("spell data", item);
    let result = false;
    if (item.id === undefined) {
      result = await dispatch(
        createDish({ dish: item /*, locale: i18n.language*/ })
      ).unwrap();
      console.log("RESULT: ", result);
    } else {
      result = await dispatch(
        updateDish({ dish: item /*, locale: i18n.language*/ })
      ).unwrap();
      console.log("RESULT: ", result);
    }
    if (result.success === true) setDialogStatus({ ...dialogStatus, showUpdateSuccess: true });
    // else showErrorSave();
  };

  if (item !== undefined) {
    return (
      <>
        {/* <pre>{JSON.stringify(item, null, 1)}</pre> */}
        <section className="hero">
          <div className="hero-body">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  value={item.name || ''}
                  onChange={(e) => setItem({ ...item, name: e.target.value })}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Summary</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Summary"
                  value={item.summary || ''}
                  onChange={(e) =>
                    setItem({ ...item, summary: e.target.value })
                  }
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Price"
                  value={item.price || ''}
                  onChange={(e) =>
                    setItem({ ...item, price: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              className="button"
              onClick={onSave}
            >
              Update
            </button>
          </div>
        </section>

        <InfoDialog
        show={dialogStatus.showUpdateSuccess}
        message={"Dish updated successfully."}
        okText={`Ok`}
        okAction={() =>
          setDialogStatus({ ...dialogStatus, showUpdateSuccess: false })
        }
      />
      </>
    );
  } else {
    return <>wait</>;
  }
};
