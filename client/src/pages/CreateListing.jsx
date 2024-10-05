import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

const CreateListing = () => {
  const [file, setFile] = useState({});
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imgUploadError, setImgUploadError] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  console.log(formData);

  const handleImageSubmit = () => {
    if (file.length > 0 && file.length + formData.imageUrls.length < 7) {
      setUpLoading(true);
      setImgUploadError(false);
      const promises = [];
      for (let i = 0; i < file.length; i++) {
        promises.push(storeImage(file[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImgUploadError(false);
          setUpLoading(false);
        })
        .catch((error) => {
          setImgUploadError("Image upload failed (2 mb max per image)");
          setUpLoading(false);
        });
    } else {
      setImgUploadError("You can only upload 6 images per listing");
      setUpLoading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    });
  };

  const handleRemoveImage = (index) => () => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg "
            id="name"
            maxLength="50"
            minLength="5"
            required
          />
          <textarea
            placeholder="description"
            className="border p-3 rounded-lg "
            id="description"
            required
          />
          <input
            type="number"
            placeholder="adsress"
            className="border p-3 rounded-lg "
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="border border-gray-300 p-3 rounded-lg "
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="border border-gray-300 p-3 rounded-lg "
                id="bathrooms"
                min="1"
                max="10"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="border border-gray-300 p-3 rounded-lg "
                id="regularPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="border border-gray-300 p-3 rounded-lg "
                id="discountPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images :
            <span className=" font-normal text-gray-600 ml-2">
              {" "}
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex ga-4 ">
            <input
              onChange={(e) => setFile(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full "
              type="file"
              id="images"
              accept="image/*"
              multiple
              required
            />
            <button
              disabled={upLoading}
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 "
            >
              {upLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {imgUploadError && (
            <p className="text-red-700 text-center text-xs">{imgUploadError}</p>
          )}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between pp-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing"
                  className="w-20 h-20 object-contain ropunded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ">
            Create Listing{" "}
          </button>
        </div>
      </form>
    </main>
  );
};
export default CreateListing;
