function getRandomArray(numItems) {
  // Create random array of objects
  let names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let data = [];
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 100 * Math.random()),
    });
  }
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date("2018-05-01T00:00:00").getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random()),
    });
  }
  return data;
}

function getData() {
  let data = [];

  data.push({
    title: "Visits",
    data: getRandomDateArray(150),
  });

  data.push({
    title: "Categories",
    data: getRandomArray(12),
  });

  data.push({
    title: "Categories",
    data: getRandomArray(10),
  });

  data.push({
    title: "Data 4",
    data: getRandomArray(6),
  });

  return data;
}

export { getRandomArray, getRandomDateArray, getData };
