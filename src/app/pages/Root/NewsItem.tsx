import React from 'react';
import { INewsResponse } from '../../utils/response/INewsResponse';

import s from './Root.module.scss';

interface INewsItem {
  post: INewsResponse;
}

const NewsItem: React.FC<INewsItem> = ({ post }) => {
  return (
    <div className={s.card}>
      <h1 className={s.title}>{post.title}</h1>
      <h3 className={s.description}>{post.description}</h3>
    </div>
  );
};

export default NewsItem;
