import React from 'react';
import Page from './Page';

const SinglePage = ({id}) => (<Page singleMode={true} id={id}>
  <div className="f2 mb2">Hello</div>
  <div>You can add any valid html markup to this page, as long as it doesn't overflows</div>

  <div className="cf w-100 mt4">
    <div className="fl w-50 bg-washed-blue vh-25 pa3">
      Floats
    </div>
    <div className="fl w-50 bg-washed-red vh-25 pa3">
      Floats
    </div>
  </div>

  <div className="f3 mt4">Lists</div>
  <ul>
    <li>Benjamin Franklin</li>
    <li>Thomas Alva Edison</li>
  </ul>

  <div className="f3 mt4 mb2">Even images</div>
  <div className="tc">
    <img src="https://source.unsplash.com/6LZuSzSwso0" className="h5"/>
    <img src="https://source.unsplash.com/as5uuSv4F84" className="h5"/>
    <div className="serif black-50 tc f6 mt2">
      With credits styling | Image by Icons8 team on <a href="https://unsplash.com/photos/6LZuSzSwso0">Unsplash</a>
    </div>
  </div>
</Page>);

export default SinglePage;