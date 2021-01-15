#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import requests
import json


# In[2]:


path = "Informacion que se insertara en la bd con excel"#carpeta con los excel


# ### Colonia , delegacion y estado

# In[3]:


df = pd.read_excel(path+"/Colonia.xlsx")


# In[ ]:


print("[INFO] Poblando Colonia")


# In[5]:


def poblarColonia(colonia):
    
    url = "http://localhost:3000/api/colonia/crear"

    payload = "{\"nombre\": \""+colonia+"\"}"
    headers = {'Content-Type': 'application/json'}

    response = requests.request("POST", url, data=payload, headers=headers)

    print(response.text)
    return response.status_code == 200


# In[8]:


for ind in df.index:
    print(df['id'][ind],df['nombre'][ind])
    poblarColonia(df['nombre'][ind])


# ###Poblar delegacin

# In[9]:


df = pd.read_excel(path+"/Delegacion.xlsx")


# In[ ]:


print("[INFO] Poblando delegacion")


# In[74]:


def sendHttp(url,method,payload):
    headers = {'Content-Type': 'application/json'}
    response = requests.request(method, url, data=payload, headers=headers)
    print(response.text)
    return response.text


# In[11]:


for ind in df.index:
    payload = {"nombre":df['nombre'][ind]}
    sendHttp("http://localhost:3000/api/delegacion/crear","POST",json.dumps(payload))


# In[12]:


df = pd.read_excel(path+"/Estado.xlsx")


# In[13]:


for ind in df.index:
    payload = {"nombre":df['nombre'][ind]}
    sendHttp("http://localhost:3000/api/estado/crear","POST",json.dumps(payload))


# ### Poblando la direccion

# In[14]:


df = pd.read_excel(path+"/Dir.xlsx")


# In[15]:


columns = ["numero","idColonia","idDelegacion","idEstado"]
print("[INFO] Poblando direccion")


# In[16]:


for x in columns:
    df[x] = df[x].map(str)


# In[17]:


for i,ind in enumerate(df.index):
    payload = {"calle":df['calle'][ind],"numero":df['numero'][ind],"idColonia":df['idColonia'][ind],"idDelegacion":df['idDelegacion'][ind],"idEstado":df['idEstado'][ind]}
    #print(i,payload)
    sendHttp("http://localhost:3000/api/direccion/crear","POST",json.dumps(payload))


# ### poblando usuario
# 

# In[21]:


df = pd.read_excel(path+"/Usuario.xlsx")


# In[22]:


df["idDireccion"] = df["idDireccion"].map(str)
print("[INFO] Poblando usuario")


# In[23]:


usuarios = []
for i,ind in enumerate(df.index):
    payload = {"email":df["email"][ind],"contrasenia":df["contraseña"][ind],"idDireccion":df["idDireccion"][ind],"nombre":df["nombre"][ind],"primerApellido":df["primerApellido"][ind],"segundoApellido":df["segundoApellido"][ind]}
    #print(i,payload)
    usuarios.append(sendHttp("http://localhost:3000/api/usuario/crear","POST",json.dumps(payload)))


# ### Poblando materia

# In[24]:


df = pd.read_excel(path+"/Materia.xlsx")
df["id"] = df["id"].map(str)
print("[INFO] Poblando materia")


# In[25]:


for i,ind in enumerate(df.index):
    payload = {"nombre":df["nombre"][ind]}
    #print(i,payload)
    sendHttp("http://localhost:3000/api/materia/crear","POST",json.dumps(payload))


# ### Poblando Situacion academica

# In[26]:


df = pd.read_excel(path+"/SituacionAcademica.xlsx")
df["id"] = df["id"].map(str)
print("[INFO] Situacion academica")


# In[27]:


for i,ind in enumerate(df.index):
    payload = {"nombre":df["nombre"][ind]}
    #print(i,payload)
    sendHttp("http://localhost:3000/api/situacionAcademica/crear","POST",json.dumps(payload))


# ## Poblanco alumnos

# In[34]:


import math as m
import random as r
print("[INFO] Poblando alumnos")


# Separamos los docentes y alumnos

# In[71]:


NUM_DOCENTE = 10
docente = []; alumno = []
aux = usuarios.copy()
for i in range(NUM_DOCENTE):
    index = r.randint(0,len(aux)-1)
    docente.append(aux[index])
    aux.remove(aux[index])
for i in range(len(usuarios)-NUM_DOCENTE):
    index = r.randint(0,len(aux)-1)
    alumno.append(aux[index])
    aux.remove(aux[index])
docente = list(map(lambda x: json.loads(x), docente))
alumno = list(map(lambda x: json.loads(x), alumno))


# ## Poblando alumnos

# In[72]:


alumno[0]


# In[75]:


sutiacion = [i for i in range(1,6)]
for a in alumno:
    payload = {"idUsuario":str(a["id"]),"idSituacionAcademica":sutiacion[r.randint(0,4)]}
    #print(i,payload)
    sendHttp("http://localhost:3000/api/alumno/crear","POST",json.dumps(payload))


# ## Poblando Docentes

# In[77]:


print("[INFO] Poblando Docentes")
for a in docente:
    payload = {"idUsuario":str(a["id"])}
    #print(i,payload)
    sendHttp("http://localhost:3000/api/docente/crear","POST",json.dumps(payload))


# ## Poblando admin

# In[81]:


print("[INFO] Poblando admin")
index = r.randint(0,len(docente)-1)
payload = {"idUsuario":str(docente[index]["id"])}
print("[INFO]adminEs:",docente[index])
#print(i,payload)
sendHttp("http://localhost:3000/api/docente/crear","POST",json.dumps(payload))


# ## Poblando Curso

# In[142]:


df = pd.read_excel(path+"/Curso.xlsx")
df["idMateria"] = df["idMateria"].map(str)
df["horaFin"] = df["horaFin"].map(str)
df["horaInicio"] = df["horaInicio"].map(str)


# In[ ]:


print("[INFO] Poblando Curso")


# In[145]:


curso = []
for ind in df.index:
    payload = {"id":df["id "][ind],"idMateria":df["idMateria"][ind],"idDocente":docente[r.randint(0,len(docente)-1)]["id"],"horaInicio":df["horaInicio"][ind],"horaFin":df["horaFin"][ind]}
    #print(payload)
    rs = sendHttp("http://localhost:3000/api/curso/crear","POST",json.dumps(payload))
    curso.append(rs)


# ### Haciendo alumno cursa (falta el modulo)(pendiente)

# In[144]:


print("[*] Poblando alumno CUrsa")


# In[ ]:


alumno, curso


# In[149]:


len(alumno), len(curso)


# In[151]:


NUM_ALUMNOS_CURSOS = 15
for i in curso:
    for i in range(NUM_ALUMNOS_CURSOS):
        payload = {}
        #print(payload)
        #rs = sendHttp("http://localhost:3000/api/curso/crear","POST",json.dumps(payload))


# ## poblando sala

# In[ ]:


print("[INFO] Poblando Sala")


# In[161]:


#por cada curso hay 1 sala
sala = []
for cur in curso:
    cur_dic = json.loads(cur)
    payload = {"idCurso":cur_dic["id"]}
    rs = sendHttp("http://localhost:3000/api/sala/crear","POST",json.dumps(payload))
    sala.append(rs)


# In[ ]:





# ## Poblando Mensaje

# In[168]:


df = pd.read_excel(path+"/Mensaje.xlsx")


# In[174]:


sala = list(map(lambda x: json.loads(x), sala))
print("[INFO] Poblando mensaje")


# In[187]:


usuarios = list(map(lambda x:json.loads(x), usuarios))


# In[199]:


mensaje = []
for ind in df.index:
    for s in sala:
        payload = {"fechaEnviado":df["fechaEnviado"][ind],"texto":df["texto"][ind],"idSala":s["id"],"idAutor":usuarios[r.randint(0,len(usuarios)-1)]["id"]}
        #print(payload)
        rs = sendHttp("http://localhost:3000/api/mensaje/crear","POST",json.dumps(payload))
        mensaje.append((rs,s))


# ## Poblando 

# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




