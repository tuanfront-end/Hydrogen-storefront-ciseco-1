import React, {type FC} from 'react';
import HeaderLogged from './HeaderLogged';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="nc-Header relative w-full z-40 ">
      <HeaderLogged />
    </div>
  );
};

export default Header;
