import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFavoriteArticles } from "../../store/userSlice";

const Favorites = () => {
  const favoriteArticles = useSelector((state) => state.user.favoriteArticles);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoriteArticles());
  }, [favoriteArticles, dispatch]);
  return (
    <div>
      <h3>User Favorites</h3>
    </div>
  );
};

export default Favorites;
