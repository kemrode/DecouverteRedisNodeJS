import test from 'node:test';
import { setTimeout } from 'timers/promises';
import { createClient } from 'redis';

await TestAccess();

async function ConnectionARedis(keyPing) {

    const client = createClient({
        url: 'redis://127.0.0.1:6377'
    });

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    await client.setNX(keyPing, '10');
    await client.expire(keyPing, 10);
    await client.decrBy(keyPing, '1')
    const decrement = await client.get(keyPing);
    await client.disconnect();
    if (decrement >= 0) {
        return true;
    } else {
        return false;
    }

}

async function TestAccess() {
    for (let index = 0; index < 30; index++) {
        let keyPing = '127.0.0.1:PING';
        const result = await ConnectionARedis(keyPing);
        if (result == true) {
            console.log("Accès autorisé");
        } else {
            console.log("Accès interdit");
        }
    }
}

async function DecouverteRedisBases() {

    const client = createClient({
        url: 'redis://127.0.0.1:6377'
    });

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    console.log("kikou, j'suis conneté lé gros !");

    await client.set("User:9", "NodeKikou");
    const vallue = await client.get("User:9");
    console.log(vallue);

    const test = await client.json.get("User:8");
    console.log(JSON.stringify(test));

    await client.disconnect();
}