let message_buffer = [];

const processData = (data) => {
  data = JSON.parse(data);

  if (Array.isArray(data.bdy)) {
    data.bdy.forEach((b) => {
      const d = {
        msg: b.msg,
        uid: b.uid,
        utime: b.utime,
        osType: JSON.parse(b.extras).osType,
        nick: JSON.parse(b.profile).nickname ?? "Unknown",
      };
      message_buffer.push(d);
    });
  }
  // console.log(data);
};

export { message_buffer, processData };
