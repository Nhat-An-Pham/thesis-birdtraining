export const UploadComponent = ({ children, value, onChange, disabled, accept, multiple = true }) => {
    return (
      <label htmlFor="contained-button-file" className="m-0 w-100">
        <input
          value={value}
          accept={accept}
          disabled={disabled}
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple={multiple}
          type="file"
          onChange={disabled ? () => {} : onChange}          
        />
        {children}
      </label>
    );
  };