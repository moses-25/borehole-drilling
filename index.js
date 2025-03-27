document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-drilling');
    const stopButton = document.getElementById('stop-drilling');
    const depthElement = document.getElementById('depth');
    const statusElement = document.getElementById('status');

    let depth = 0;
    let drilling = false;

    startButton.addEventListener('click', () => {
        if (!drilling) {
            drilling = true;
            statusElement.textContent = 'Drilling';
            startDrilling();
        }
    });

    stopButton.addEventListener('click', () => {
        if (drilling) {
            drilling = false;
            statusElement.textContent = 'Idle';
        }
    });

    function startDrilling() {
        const interval = setInterval(() => {
            if (!drilling) {
                clearInterval(interval);
                return;
            }
            depth += 1;
            depthElement.textContent = depth;
            updateServerDepth(depth);
        }, 1000);
    }

    function updateServerDepth(depth) {
        fetch('https://your-server-endpoint.com/update-depth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ depth: depth }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});