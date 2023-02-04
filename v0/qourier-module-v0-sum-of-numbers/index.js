const sum = async (a = 0, b = 0, c = 0, d = 0, e = 0) => {
  return (
    (a ? parseInt(a) : 0) +
    (b ? parseInt(b) : 0) +
    (c ? parseInt(c) : 0) +
    (d ? parseInt(d) : 0) +
    (e ? parseInt(e) : 0)
  );
};

export default sum;
