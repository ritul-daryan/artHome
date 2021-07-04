import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { getArtistProfileFun, getArtistArtFun } from '../action/artistProfile';
import DisplayArt from '../Components/DisplayArt';

import insta from '../assets/Images/insta.svg';
import facebook from '../assets/Images/facebook.svg';
import { useParams } from 'react-router-dom';
import {
  CLEAR_ARTIST_ART_LIST,
  SET_ERROR_ARTIST_PROFILE,
} from '../action/action.type';

const ArtistProfileScreen = ({
  artistProfile,
  lastArt,
  error,
  artistArtList,
  getArtistArtFun,
  getArtistProfileFun,
}) => {
  const { artistuid } = useParams();
  const dispatch = useDispatch();
  const handleLoadMore = async () => {
    getArtistArtFun({ uid: artistuid, lastArt });
  };

  useEffect(() => {
    if (artistuid) {
      dispatch({ type: CLEAR_ARTIST_ART_LIST });
      getArtistArtFun({ uid: artistuid, lastArt: [] });
      getArtistProfileFun({ uid: artistuid });
    } else {
      dispatch({ type: SET_ERROR_ARTIST_PROFILE, payload: 'NO UID FPOUND' });
    }
  }, [artistuid]);
  console.log('ERROR', error);

  return (
    <>
      {artistProfile ? (
        <>
          <div className="pageTitle">
            <h2>{artistProfile.name}</h2>
          </div>
          <div className="profileCard">
            <img className="profile__image" src={artistProfile.profilePicUrl} />
            <div className="profile__data">
              <p>Total arts : Comming Soon</p>
              <p>Born in {artistProfile.dateOfBirth}</p>
              <p>Date Started : {artistProfile.dateStarted}</p>
              <p>Bio </p>
              <p>{artistProfile.bio}</p>
              <div className="social_links">
                <img src={insta} />
                <img src={facebook} />
              </div>
            </div>
          </div>
          <div className="pageTitle">
            <h2>MY ARTS</h2>
          </div>
          <div className="artGallery">
            {artistArtList.length ? (
              <>
                {artistArtList.map((item, index) => (
                  <DisplayArt item={item} key={index} />
                ))}
              </>
            ) : null}
          </div>

          <div className="load-more" onClick={() => handleLoadMore()}>
            View More Arts
          </div>
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = state => ({
  artistProfile: state.artistProfile.artistProfile,
  artistArtList: state.artistProfile.artistArtList,
  lastArt: state.artistProfile.artistLastArt,
  error: state.artistProfile.error,
});

const mapDispatchToProps = {
  getArtistProfileFun: data => getArtistProfileFun(data),
  getArtistArtFun: data => getArtistArtFun(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistProfileScreen);
