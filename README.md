# KCA Demo Application 🚀

This is a **Kubernetes Helm demo application** showcasing a simple full-stack setup:

- **Frontend:** Static HTML + CSS served by Nginx  
- **Backend:** Node.js + Express REST API  
- **Database:** MongoDB StatefulSet with persistent storage  
- **Deployment:** Helm chart for easy installation  
- **Ingress:** Exposed via NGINX Ingress Controller  

---

### 🏗 Application Architecture

<div align="center" style="background-color:#f6f8fa; padding:10px; border-radius:5px; display:inline-block; text-align:left;">
<pre>
Browser
|
AWS Route53 (DNS)
|
EC2 Public IP
|
Nginx Reverse Proxy
|
Ingress Controller (NodePort)
|
Ingress Routing Rules
|
Frontend Service - Backend Service - MongoDB StatefulSet
|
Persistent Volume (PVC)
Secret (DB credentials)
</pre>
</div>


- Frontend served via ConfigMap + Nginx  
- Backend connects to MongoDB using credentials stored in Kubernetes Secret  
- MongoDB is deployed as a StatefulSet with test data preloaded  

---

### 🛠 Components

| Component | Description |
|-----------|-------------|
| Frontend  | Nginx serving `index.html` via ConfigMap |
| Backend   | Node.js + Express API (`/data`) |
| Database  | MongoDB StatefulSet with PVC and Secret |
| Storage   | PersistentVolume + StorageClass |
| Ingress   | Exposes frontend and backend via `/` and `/data` |

---

### ⚡ Backend

The backend provides a simple API to retrieve MongoDB test data.

**server.js snippet:**

```javascript
app.get("/", async (req, res) => {
  const data = await Data.find();
  res.json(data);
});
```

**Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]
```
---

### 🖥 Frontend

The frontend is a static HTML page displaying:
- App architecture diagram
- MongoDB test data table
- Demo styles with responsive layout

Served using **Nginx** with ConfigMap.

---

### 💾 MongoDB

- StatefulSet with 1 replica
- Initialized with test data (columns col1-col5)
- Uses `Secret` for credentials
- Data stored in PVC (PersistentVolumeClaim)

---

### 🚀 Installation via Helm

1. Clone the repository:
```bash
git clone https://github.com/Jozefcvik/k8s-helm-kca-demo.git
cd kca-demo/helm-chart
```

2. Edit `values.yaml` for MongoDB credentials and storage size:
```yaml
mongo:
  username: myuser
  password: mypass
  database: kca-demo
storage:
  size: 1Gi
```

3. Deploy Helm chart:
```bash
helm install kca-demo . --namespace kca-demo --create-namespace
```

4. Access frontend and backend via Ingress:
```
Frontend: http://kca-demo.jozefcvik.com/
Backend API: http://kca-demo.jozefcvik.com/data
```

---

### 🔐 Security

- MongoDB credentials stored in Kubernetes Secret
- Backend connects securely using env variables
- Ingress routes traffic with NGINX (optional SSL configuration)
- Persistent storage ensures data survives pod restarts

---

### 📄 Tech Stack

- Kubernetes (single-node or cluster)
- Helm (deployment & templating)
- Node.js + Express (backend)
- MongoDB (StatefulSet)
- Nginx (frontend)
- Persistent Volumes & Secrets
