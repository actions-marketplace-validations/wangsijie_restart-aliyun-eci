const core = require("@actions/core");
const Request = require("aliyun-sdk-node-request").default;

async function run() {
  const accessKeyId = core.getInput("access-key-id", { required: true });
  const accessKeySecret = core.getInput("access-key-secret", {
    required: true,
  });
  const regionId = core.getInput("region-id", { required: true });
  let containerGroupId = core.getInput("container-group-id", {
    required: false,
  });
  const containerGroupName = core.getInput("container-group-name", {
    required: false,
  });

  if (!containerGroupId && !containerGroupName) {
    core.setFailed(
      `Both container-group-id and container-group-name are empty`
    );
    return;
  }

  const client = new Request({
    endpoint: `http://eci.aliyuncs.com`,
    AccessKeyId: accessKeyId,
    AccessKeySecret: accessKeySecret,
    Version: "2018-08-08",
  });

  if (!containerGroupId) {
    const res = await client.invoke("DescribeContainerGroups", {
      RegionId: regionId,
    });
    const { ContainerGroups } = res.data;
    const group = ContainerGroups.find(
      (item) => item.ContainerGroupName === containerGroupName
    );
    if (!group) {
      core.setFailed(
        `Cannot find ContainerGroup with name: ${containerGroupName}`
      );
      return;
    }
    containerGroupId = group.ContainerGroupId;
  }

  const res = await client.invoke("RestartContainerGroup", {
    RegionId: regionId,
    ContainerGroupId: containerGroupId,
  });

  console.log(res.data);
  core.setOutput("res", res.data);
}

run().catch((e) => core.setFailed(e));
