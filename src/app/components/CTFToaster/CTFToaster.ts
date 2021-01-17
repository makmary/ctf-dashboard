import { Position, Toaster } from '@blueprintjs/core';

const CTFToaster = Toaster.create({
  className: 'recipe-toaster',
  position: Position.BOTTOM_LEFT,
  maxToasts: 5,
});

export default CTFToaster;
