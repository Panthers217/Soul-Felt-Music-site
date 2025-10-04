import React, { useState } from "react";
import CalendarIcon from "../modal/CalendarIcon";
import CalendarModal from "../modal/CalendarModal";

const InputFields = ({
  fields,
  fieldValues,
  setFieldValues,
  requiredFields = [],
  booleanFields = [],
  isRestrictedField = () => false,
}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Helper to check if a field is release_date
  const isReleaseDate = (field) => field === "release_date";

  // Helper to format date as yyyy-mm-dd
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // Helper to check if a field is boolean
  const isBooleanField = (field) => booleanFields.includes(field);

  // Helper to convert dropdown value to 0/1 for fieldValues
  const handleBooleanChange = (field, value) => {
    setFieldValues({
      ...fieldValues,
      [field]: value === 'true' ? 1 : 0,
    });
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Enter values for selected fields:</h3>
      {fields.map((field, i) => (
        <div key={field} className="mb-2 relative">
          <label className="block mb-1">{field}</label>
          {field === "cover_url" ||
          field === "image_url" ||
          field === "promo_audio_url" ||
          field === "promo_video_url" ||
          field === "video_url" ||
          field === "audio_url" ? (
            <>
              <input
                type="file"
                accept={
                  field === "audio_url"
                    ? "audio/*"
                    : field === "video_url"
                    ? "video/*"
                    : field === "image_url"
                    ? "image/*"
                    : field === "promo_audio_url"
                    ? "audio/*"
                    : field === "promo_video_url"
                    ? "video/*"
                    : "image/*"
                }
                onChange={(e) => {
                  setFieldValues({
                    ...fieldValues,
                    [field]: e.target.files[0],
                  });
                }}
                className="w-full p-2 border rounded mb-1"
                required={requiredFields.includes(field)}
                disabled={isRestrictedField(field)}
              />
              <span className="text-xs text-gray-500">
                (Optional: upload a file or enter a URL below)
              </span>
              <input
                type="text"
                value={
                  typeof fieldValues[field] === "string"
                    ? fieldValues[field]
                    : ""
                }
                onChange={(e) =>
                  setFieldValues({ ...fieldValues, [field]: e.target.value })
                }
                className="w-full p-2 border rounded mt-1"
                placeholder={
                  field === "audio_url"
                    ? "Audio URL (optional)"
                    : "Image URL (optional)"
                }
                required={requiredFields.includes(field)}
                disabled={isRestrictedField(field)}
              />
            </>
          ) : isReleaseDate(field) ? (
            <>
              <input
                type="text"
                value={fieldValues[field] || ""}
                onChange={(e) =>
                  setFieldValues({ ...fieldValues, [field]: e.target.value })
                }
                className="w-full p-2 border rounded pr-10"
                placeholder="YYYY-MM-DD"
                required={requiredFields.includes(field)}
                disabled={isRestrictedField(field)}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <CalendarIcon onClick={() => setCalendarOpen(true)} />
              </span>
              <CalendarModal
                isOpen={calendarOpen}
                onClose={() => setCalendarOpen(false)}
                onSelectDate={(date) => {
                  setFieldValues({
                    ...fieldValues,
                    [field]: formatDate(date),
                  });
                  setCalendarOpen(false);
                }}
              />
            </>
          ) : isBooleanField(field) ? (
            <select
              className="w-full p-2 border rounded"
              value={
                fieldValues[field] === 1
                  ? "true"
                  : fieldValues[field] === 0
                  ? "false"
                  : ""
              }
              onChange={(e) => handleBooleanChange(field, e.target.value)}
              required={requiredFields.includes(field)}
              disabled={isRestrictedField(field)}
            >
              <option value="" disabled>
                Select true or false
              </option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          ) : (
            <input
              type="text"
              autoFocus={i === 0}
              value={fieldValues[field] || ""}
              onChange={(e) =>
                setFieldValues({ ...fieldValues, [field]: e.target.value })
              }
              className="w-full p-2 border rounded"
              required={requiredFields.includes(field)}
              placeholder={
                field === "phone_number"
                  ? "e.g. 000-123-4567"
                  : field === "email"
                  ? "e.g. example@example.com"
                  : undefined
              }
              disabled={isRestrictedField(field)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default InputFields;
