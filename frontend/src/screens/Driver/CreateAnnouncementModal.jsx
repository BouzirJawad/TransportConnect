import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { useAuth } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const CITIES = ["Casablanca", "Rabat", "Fes", "Marrakech", "Agadir"];
const PACKAGE_OPTIONS = ["fragile", "perishable", "liquid", "heavy"];

const CreateAnnouncementModal = ({ onClose }) => {
  const { user, token } = useAuth();

  const formik = useFormik({
    initialValues: {
      startPoint: "",
      wayPoints: [],
      destination: "",
      maxDimensions: {
        length: "",
        width: "",
        height: "",
      },
      packagesTypes: [],
      availableCapacity: "",
      startDate: "",
    },
    validationSchema: Yup.object({
      startPoint: Yup.string()
        .required("Start point is required")
        .notOneOf(
          [Yup.ref("destination")],
          "Start point and destination cannot be the same"
        ),
      destination: Yup.string()
        .required("Destination is required")
        .notOneOf(
          [Yup.ref("startPoint")],
          "Start point and destination cannot be the same"
        ),
      availableCapacity: Yup.number().required("Capacity is required").min(0),
      startDate: Yup.date()
        .required("Start date is required")
        .min(new Date(), "Start date must be in the future"),
      maxDimensions: Yup.object({
        length: Yup.number()
          .required("Length is required")
          .min(0, "Must be >= 0"),
        width: Yup.number()
          .required("Width is required")
          .min(0, "Must be >= 0"),
        height: Yup.number()
          .required("Height is required")
          .min(0, "Must be >= 0"),
      }),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          ...values,
          driver: user._id,
        };
        await axios.post(
          "http://localhost:7460/api/announcements/create",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Announcement created successfully!", {duration: 2000});
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to create announcement"
        );
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (formik.values.startPoint === formik.values.destination) {
      formik.setFieldValue("destination", "");
    }
  }, [formik.values.startPoint]);

  useEffect(() => {
    if (formik.values.destination === formik.values.startPoint) {
      formik.setFieldValue("startPoint", "");
    }
  }, [formik.values.destination]);

  const toggleWaypoint = (city) => {
    const newwayPoints = formik.values.wayPoints.includes(city)
      ? formik.values.wayPoints.filter((c) => c !== city)
      : [...formik.values.wayPoints, city];
    formik.setFieldValue("wayPoints", newwayPoints);
  };

  const togglePackageType = (type) => {
    const newTypes = formik.values.packagesTypes.includes(type)
      ? formik.values.packagesTypes.filter((t) => t !== type)
      : [...formik.values.packagesTypes, type];
    formik.setFieldValue("packagesTypes", newTypes);
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-50 flex items-start justify-center py-10 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Announcement
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Start Point */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Start Point
            </label>
            <select
              name="startPoint"
              value={formik.values.startPoint}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            >
              <option value="">Select start point</option>
              {CITIES.map((city) => (
                <option
                  key={city}
                  value={city}
                  disabled={city === formik.values.destination}
                >
                  {city}
                </option>
              ))}
            </select>
            {formik.errors.startPoint && formik.touched.startPoint && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.startPoint}
              </p>
            )}
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Destination
            </label>
            <select
              name="destination"
              value={formik.values.destination}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            >
              <option value="">Select destination</option>
              {CITIES.map((city) => (
                <option
                  key={city}
                  value={city}
                  disabled={city === formik.values.startPoint}
                >
                  {city}
                </option>
              ))}
            </select>
            {formik.errors.destination && formik.touched.destination && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.destination}
              </p>
            )}
          </div>

          {/* wayPoints */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              wayPoints
            </label>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <button
                  type="button"
                  key={city}
                  onClick={() => toggleWaypoint(city)}
                  className={`px-3 py-1 rounded-xl border transition ${
                    formik.values.wayPoints.includes(city)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-blue-500 border-blue-500"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-4">
            {["length", "width", "height"].map((dim) => (
              <div key={dim}>
                <label className="block text-sm font-semibold mb-1 capitalize">
                  {dim}
                </label>
                <input
                  type="number"
                  name={`maxDimensions.${dim}`}
                  value={formik.values.maxDimensions[dim]}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  min="0"
                />
                {formik.errors.maxDimensions?.[dim] &&
                  formik.touched.maxDimensions?.[dim] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.maxDimensions[dim]}
                    </p>
                  )}
              </div>
            ))}
          </div>

          {/* Available Capacity */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Available Capacity (kg)
            </label>
            <input
              type="number"
              name="availableCapacity"
              value={formik.values.availableCapacity}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              min="0"
            />
            {formik.errors.availableCapacity &&
              formik.touched.availableCapacity && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.availableCapacity}
                </p>
              )}
          </div>

          {/* Package Types */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Package Types
            </label>
            <div className="flex flex-wrap gap-2">
              {PACKAGE_OPTIONS.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => togglePackageType(type)}
                  className={`px-3 py-1 rounded-xl border transition ${
                    formik.values.packagesTypes.includes(type)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-blue-500 border-blue-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            {formik.errors.startDate && formik.touched.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.startDate}
              </p>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-orange-1 text-white px-6 py-2 rounded-2xl hover:bg-orange-2 transition"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateAnnouncementModal;
