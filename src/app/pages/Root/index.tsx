import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import { fetchNewsList, selectors } from '../../features/listOfNews/@slice';
import { INewsResponse } from '../../utils/response/INewsResponse';
import NewsItem from './NewsItem';

import s from './Root.module.scss';

const Root: React.FC = () => {
  const arraySizeToDisplay = 10;

  const dispatch = useDispatch();
  const newsList = useSelector(selectors.dataSelector);

  React.useEffect(() => {
    dispatch(fetchNewsList());
  }, []);

  return (
    <div>
      <NavBar name="News" />
      <div className={s.main}>
        {newsList.slice(0, arraySizeToDisplay).map((item: INewsResponse) => {
          return <NewsItem key={item.id} post={item} />;
        })}
      </div>
    </div>
  );
};

export default Root;
