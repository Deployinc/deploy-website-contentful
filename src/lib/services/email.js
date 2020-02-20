const encode = (data) => 
  Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");

const postToNetlify = async (formData) => {
  delete formData.recaptcha;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode(formData),
  };
  
  try {
    const res = await fetch('/', options);
    const data = await res.json();
  } catch(err) {
    console.log(err);
  }
};

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
      postToNetlify(formData);

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