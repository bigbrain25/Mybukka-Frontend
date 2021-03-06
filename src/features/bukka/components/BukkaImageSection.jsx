/* eslint-disable no-undef */
import React, { Fragment } from 'react';

import { useSessionStorage } from '../../../hooks/useSession';
import { useCloudinayService } from '../../../components/img/Cloudinary';

import './bukkaImage.scss';

const BukkaImage = ({ business }) => {
  const src = (business && (business.headerImg || business.imageUrl)) || '';
  const { domain, supports } = useCloudinayService();
  const [state, setState] = useSessionStorage(src || 'bukkaImg', false);
  const width = window.innerWidth;

  // lower Quality and standard quality
  const lwQImgOption = { w: Math.floor(width / 6) };
  const StdQImgOption = { w: width <= 767 ? 1000 : 'auto' };
  // Create an empty query string
  let queryString = '', lwQString = '', ext = 'jpg';

  // If a format has not been specified, detect webp support
  if (supports.webp) {
    ext = 'webp';
  }

  // Loop through option prop and build queryString
  Object.keys(lwQImgOption).map((option, i) => {
    lwQString += `${i < 1 ? '' : ','}${option}_${lwQImgOption[option]}`;
    return true;
  });

  Object.keys(StdQImgOption).map((option, i) => {
    queryString += `${i < 1 ? '' : ','}${option}_${StdQImgOption[option]}`;
    return true;
  });

  const [storageClienId, imageInfoWithExt] = (src && src.replace(domain, '').split('upload')) || '';
  const imageInfo = (src && imageInfoWithExt.replace(/\.(jpe?g|gif|png|PNG|svg|webp)$/, '')) || '';

  return (
    <Fragment>
      <img onLoad={() => setState(true)} hidden src={`${`${domain}${storageClienId}upload/${queryString}${imageInfo}.${ext}`}`} alt="alt" />
      <div
        className="bukka-image-section"
        style={{ width: '100%', backgroundImage: `url(${domain}${storageClienId}upload/${lwQString}${imageInfo}.${ext})`, position: 'absolute', opacity: !state ? 1 : 0 }}
      />
      <div
        className="bukka-image-section"
        style={{ backgroundImage: `url(${domain}${storageClienId}upload/${queryString}${imageInfo}.${ext})`, opacity: state ? 1 : 0 }}
      />
    </Fragment>
  );
};

export default BukkaImage;
