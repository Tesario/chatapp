import React, { useState, useEffect } from "react";
import axios from "axios";
import convert from "image-file-resize";

import "./Settings.scss";

function Settings(props) {
  const { notify } = props;
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    picture: null,
    urlPicture: "",
  });

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    await axios({
      url: "/user/get",
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setProfile({
          ...profile,
          email: res.data.user.email,
          name: res.data.user.name,
          loadedPicture: res.data.user.picture,
        });
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      ) {
        convert({
          file,
          width: 50,
          height: 50,
          type: "png",
        })
          .then((res) => {
            setProfile({ ...profile, picture: res });
          })
          .catch(() => {
            notify("Failed file loaded");
          });
        return;
      }

      setProfile({ ...profile, picture: file });
      return;
    }

    setProfile({ ...profile, picture: null });
  };

  const handleColor = (e) => {
    const root = document.documentElement;
    root.style.setProperty("--" + e.target.id, e.target.value);
    localStorage.setItem(e.target.id, e.target.value);
  };

  const handleReset = () => {
    localStorage.removeItem("primary-color");
    localStorage.removeItem("secondary-color");
    localStorage.removeItem("text-color");

    const root = document.documentElement;
    root.style.setProperty("--primary-color", "#18a0fb");
    root.style.setProperty("--secondary-color", "#0d1117");
    root.style.setProperty("--text-color", "#ffffff");
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("picture", profile.picture);
    formData.append("email", profile.email);
    formData.append("name", profile.name);

    await axios({
      url: "/user/edit",
      method: "PUT",
      data: formData,
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        notify(res.data);
        getUser();
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const onInputChange = (e) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  return (
    <div className="settings container-fluid">
      <h1 className="settings__title">
        Settings <i className="fas fa-cog"></i>
      </h1>
      <div className="settings-grid">
        <form
          className="profile-form"
          onSubmit={(e) => onSubmitForm(e)}
          encType="multipart/form-data"
        >
          <div className="subtitle without-line">
            Profile <i className="fas fa-user-circle"></i>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Email"
              defaultValue={profile.email}
              onChange={(e) => onInputChange(e)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="username"
              defaultValue={profile.name}
              onChange={(e) => onInputChange(e)}
            />
            <label htmlFor="name">Username</label>
          </div>
          <div className="file-input">
            <label htmlFor="picture" className="form-label">
              Profile picture
              <div className="image">
                <img src={profile.loadedPicture} alt={profile.name} />
              </div>
            </label>
            <input
              className="form-control"
              type="file"
              id="file"
              onChange={(e) => onChangePicture(e)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
        <form className="colors-form">
          <div className="subtitle without-line">
            Theme <i className="fas fa-palette"></i>
          </div>
          <div className="form-input">
            <label htmlFor="primary-color">Primary color</label>
            <input
              type="color"
              id="primary-color"
              defaultValue="#18a0fb"
              onChange={(e) => handleColor(e)}
            />
          </div>
          <div className="form-input">
            <label htmlFor="secondary-color">Secondary color</label>
            <input
              type="color"
              id="secondary-color"
              defaultValue="#0d1117"
              onChange={(e) => handleColor(e)}
            />
          </div>
          <div className="form-input">
            <label htmlFor="text-color">Text color</label>
            <input
              type="color"
              id="text-color"
              defaultValue="#ffffff"
              onChange={(e) => handleColor(e)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleReset()}
          >
            Reset to default
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
