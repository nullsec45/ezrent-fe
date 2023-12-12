'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/api';
import PropTypes from 'prop-types';

export default function ButtonLogout({
  classNameBtn,
  classNameWrapper,
  size,
  LogoutIcon,
  text,
}) {
  const { push } = useRouter();
  const handleLogout = async () => {
    await logout();
    push('/auth');
  };
  return (
    <Button
      onClick={handleLogout}
      className={classNameBtn}
      size={size ? size : 'default'}
    >
      {classNameWrapper ? (
        <div className={classNameWrapper}>
          <LogoutIcon />
          {text}
        </div>
      ) : text ? (
        <>
          <LogoutIcon />
          {text}
        </>
      ) : (
        <LogoutIcon />
      )}
    </Button>
  );
}

ButtonLogout.propTypes = {
  classNameBtn: PropTypes.string.isRequired,
  classNameWrapper: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string,
  LogoutIcon: PropTypes.object.isRequired,
};
