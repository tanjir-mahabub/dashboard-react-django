import asyncio
import json
import psutil
from channels.generic.websocket import AsyncWebsocketConsumer

class RealTimeDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """
        Handles WebSocket connection. Starts sending real-time metrics periodically.
        """
        await self.accept()
        self.running = True
        asyncio.create_task(self.send_metrics())  # Start the metrics sending loop

    async def disconnect(self, close_code):
        """
        Handles WebSocket disconnection. Stops sending metrics.
        """
        self.running = False

    async def send_metrics(self):
        """
        Periodically sends real-time system metrics to the client.
        """
        while self.running:
            try:
                # Collect system metrics
                cpu_percent = psutil.cpu_percent(interval=None)
                memory_info = psutil.virtual_memory()
                disk_info = psutil.disk_usage('/')
                network_info = psutil.net_io_counters()

                data = {
                    "cpu_percent": cpu_percent,
                    "memory_percent": memory_info.percent,
                    "memory_used": memory_info.used,
                    "memory_total": memory_info.total,
                    "disk_used": disk_info.used,
                    "disk_total": disk_info.total,
                    "disk_percent": disk_info.percent,
                    "bytes_sent": network_info.bytes_sent,
                    "bytes_received": network_info.bytes_recv,
                    "process_count": len(psutil.pids()),
                }

                # Send data to the client
                await self.send(text_data=json.dumps(data))
                await asyncio.sleep(1)  # Send metrics every second
            except Exception as e:
                self.running = False
                print(f"Error in send_metrics: {e}")

    async def receive(self, text_data):
        """
        Handles incoming messages (if needed). Currently, no implementation.
        """
        pass
