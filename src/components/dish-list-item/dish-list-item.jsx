
export const DishListItem = ({ item, editAction, removeAction }) => {
  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <p className="title">{item.name}</p>
          <p className="subtitle">{item.summary} - {item.price}</p>
          <button className="button" onClick={() => (editAction !== undefined) ? editAction(item) : null }>Edit</button>
          <button className="button" onClick={() => (removeAction !== undefined) ? removeAction(item) : null }>Remove</button>
        </div>
      </section>
    </>
  );
};
