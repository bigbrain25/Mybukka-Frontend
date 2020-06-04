import React, { useEffect } from 'react';
import '../navbar.scss';
import useClickOutside from '../../../hooks/useClickOutside';
import { useUserContext } from '../../../context/UserContext';
import { useDropdownContext } from '../../../context/DropdownContext';
import SingleImage from '../../img/SingleImage';
import UserDropdown from './UserDropdown';

const UserDefaultImage = () => {
  const { user } = useUserContext();
  const wrapperRef = React.useRef(null);
  const { setUserOptions, userOptions } = useDropdownContext();

  useEffect(() => {
    setUserOptions(false);
    return () => setUserOptions(false);
  }, []);

  useClickOutside(() => setUserOptions(false), wrapperRef);

  return (
    <div ref={wrapperRef} className="user-default-img">
      <div className="position-relative">
        <button className="auth-btn-drop" onClick={() => setUserOptions(true)}>
          <SingleImage style={{ width: '30px', height: '30px' }} options={{ w: 30 }} src={user.imageUrl} alt="userImg" />
        </button>
        {userOptions && <UserDropdown />}
      </div>
    </div>
  );
};

export default UserDefaultImage;

UserDefaultImage.defaultProps = {};

UserDefaultImage.propTypes = {};
