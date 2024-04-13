import Requests from "@/services/requests/Requests";
import type {Task} from "@/services/models/Task";

class TaskServices {
    private requests: Requests;
    private readonly url: string;

    constructor(requests: Requests, user_url: string) {
        this.requests = requests;
        this.url = user_url;
    }

    async addTask(name: string, description: string): Promise<Task> {
        try {
            const response = await this.requests.post(this.url + '/task', true, { name, description });
            if (response.body) {
                const reader = response.body.getReader();
                const result = await reader.read();
                const decoder = new TextDecoder('utf-8');
                const json = decoder.decode(result.value);
                return JSON.parse(json) as Task;
            }
            throw new Error('Response body is null');
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    }

    async getTasks(): Promise<Task[]> {
        try {
            const response = await this.requests.get(this.url + '/search', true);
            if (response.body) {
                const reader = response.body.getReader();
                const result = await reader.read();
                const decoder = new TextDecoder('utf-8');
                const json = decoder.decode(result.value);
                return JSON.parse(json) as Task[];
            }
            throw new Error('Response body is null');
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    }
    async deleteTask(taskId: number): Promise<boolean> {
        try {
            const response = await this.requests.delete(this.url + '/task/' + taskId, true);
            return response.status == 200
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }
}

export default TaskServices;
