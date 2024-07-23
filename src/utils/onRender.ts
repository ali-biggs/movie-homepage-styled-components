export const onRender = (
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
) => {
  console.log("Profiler data");
  console.log("id:", id);
  console.log("phase:", phase);
  console.log("actualDuration:", actualDuration);
  console.log("baseDuration:", baseDuration);
  console.log("startTime:", startTime);
  console.log("commitTime:", commitTime);
};
