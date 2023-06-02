
export const OrderListItem = ({ item, editAction, removeAction }) => {
  const dishList = item.dishes.map((dish, i) => {
    return (<li>{dish.name} - X {dish.quantity}</li>)
  })
  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <p className="title">NEW ORDER #</p>
          <p className="subtitle">TOTAL {item.paymentInfos.total}</p>
          <ul>
            {dishList}
          </ul>
          {/* <button className="button" onClick={() => (editAction !== undefined) ? editAction(item) : null }>Edit</button>
          <button className="button" onClick={() => (removeAction !== undefined) ? removeAction(item) : null }>Remove</button> */}
        </div>
      </section>
    </>
  );
};
