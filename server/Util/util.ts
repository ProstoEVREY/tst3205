export async function wait(timeMS: number) {
  await new Promise((resolve) => setTimeout(resolve, timeMS));
}
