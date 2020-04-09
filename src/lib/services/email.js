const encode = (data) => 
  Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");

const sendEmail = async (formData, url) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (data.success) {
      return {
        success: true,
        error: null
      };
    } else {
      return {
        success: false,
        error: data.error
      };
    }

  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: 'An unknown error occured. Check your internet connection please.'
    };
  }
};

export default sendEmail;