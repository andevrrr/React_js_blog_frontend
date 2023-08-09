const button = (props) => {
  return (
    <form action={`/admin/delete-post/${post._id}`} method="POST">
      <input type="hidden" name="_csrf" value="{csrfToken}" />
      <button type="submit" className="btn">
        Delete
      </button>
    </form>
  );
};

export default button;
