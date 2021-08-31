# Restart Aliyun ECI ContainerGroup

```yaml
- uses: wangsijie/restart-aliyun-eci@v1
  with:
    access-key-id: <access-key-id>
    access-key-secret: <access-key-secret>
    region-id: cn-shanghai
    container-group-id: eci-j6c2j6nqhbh52oxntse
```

or use `container-group-name`

```yaml
- uses: wangsijie/restart-aliyun-eci@v1
  with:
    access-key-id: <access-key-id>
    access-key-secret: <access-key-secret>
    region-id: cn-shanghai
    container-group-name: my-nginx
```
