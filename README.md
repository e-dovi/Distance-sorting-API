# Distance-sorting-API
This API accepts in the body of the POST request a JSON object that contains an array of addresses, and a 'location' property whose value will be used as origin to sort the addresses in the array by distance.

The response to the request is an array that will contain the addresses in the array and their respective distances (meter) from the address of the 'location' property.

The path of the request is 'locations/sort'.

Please take note of the format of the address for an optimal result.

![Sample-request](https://github.com/e-dovi/Distance-sorting-API/assets/118570519/2e7c8fa0-8596-4bfc-8c22-22e8c7e4db5c)
![Sample-response](https://github.com/e-dovi/Distance-sorting-API/assets/118570519/28e58368-c351-4fff-9f42-f2df1a03ec61)
