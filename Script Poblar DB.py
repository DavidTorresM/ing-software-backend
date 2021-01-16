#!/usr/bin/env python
# coding: utf-8

# In[85]:


import pandas as pd
import requests
import json


# In[86]:


path = "Informacion que se insertara en la bd con excel"#carpeta con los excel
ip = "localhost" #Ip del servidor remoto
port = "3000" #puerto de la api


# ### Colonia , delegacion y estado

# In[87]:


df = pd.read_excel(path+"/Colonia.xlsx")


# In[88]:


print("[INFO] Poblando Colonia")


# In[89]:


def poblarColonia(colonia):
    
    url = "http://{}:{}/api/colonia/crear".format(ip,port)

    payload = "{\"nombre\": \""+colonia+"\"}"
    headers = {'Content-Type': 'application/json'}

    response = requests.request("POST", url, data=payload, headers=headers)

    print(response.text)
    return response.status_code == 200


# In[90]:


for ind in df.index:
    print(df['id'][ind],df['nombre'][ind])
    poblarColonia(df['nombre'][ind])


# ###Poblar delegacin

# In[91]:


df = pd.read_excel(path+"/Delegacion.xlsx")


# In[92]:


print("[INFO] Poblando delegacion")


# In[93]:


def sendHttp(url,method,payload):
    headers = {'Content-Type': 'application/json'}
    response = requests.request(method, url, data=payload, headers=headers)
    print(response.text)
    return response.text


# In[94]:


for ind in df.index:
    payload = {"nombre":df['nombre'][ind]}
    sendHttp("http://{}:{}/api/delegacion/crear".format(ip,port),"POST",json.dumps(payload))


# In[95]:


df = pd.read_excel(path+"/Estado.xlsx")


# In[96]:


for ind in df.index:
    payload = {"nombre":df['nombre'][ind]}
    sendHttp("http://localhost:3000/api/estado/crear","POST",json.dumps(payload))


# ### Poblando la direccion

# In[97]:


df = pd.read_excel(path+"/Dir.xlsx")


# In[98]:


columns = ["numero","idColonia","idDelegacion","idEstado"]
print("[INFO] Poblando direccion")


# In[99]:


for x in columns:
    df[x] = df[x].map(str)


# In[100]:


for i,ind in enumerate(df.index):
    payload = {"calle":df['calle'][ind],"numero":df['numero'][ind],"idColonia":df['idColonia'][ind],"idDelegacion":df['idDelegacion'][ind],"idEstado":df['idEstado'][ind]}
    #print(i,payload)
    sendHttp("http://localhost:3000/api/direccion/crear","POST",json.dumps(payload))


# ### poblando usuario
# 

# In[101]:


df = pd.read_excel(path+"/Usuario.xlsx")


# In[102]:


df["idDireccion"] = df["idDireccion"].map(str)
print("[INFO] Poblando usuario")


# In[103]:


usuarios = []
for i,ind in enumerate(df.index):
    payload = {"email":df["email"][ind],"contrasenia":df["contraseña"][ind],"idDireccion":df["idDireccion"][ind],"nombre":df["nombre"][ind],"primerApellido":df["primerApellido"][ind],"segundoApellido":df["segundoApellido"][ind]}
    #print(i,payload)
    usuarios.append(sendHttp("http://localhost:3000/api/usuario/crear","POST",json.dumps(payload)))


# ### Poblando materia

# In[106]:


df = pd.read_excel(path+"/Materia.xlsx")
df["id"] = df["id"].map(str)
print("[INFO] Poblando materia")


# In[107]:


for i,ind in enumerate(df.index):
    payload = {"nombre":df["nombre"][ind]}
    #print(i,payload)
    sendHttp("http://localhost:3000/api/materia/crear","POST",json.dumps(payload))


# ### Poblando Situacion academica

# In[108]:


df = pd.read_excel(path+"/SituacionAcademica.xlsx")
df["id"] = df["id"].map(str)
print("[INFO] Situacion academica")


# In[109]:


for i,ind in enumerate(df.index):
    payload = {"nombre":df["nombre"][ind]}
    #print(i,payload)
    sendHttp("http://localhost:3000/api/situacionAcademica/crear","POST",json.dumps(payload))


# ## Separando alumnos y docentes

# In[110]:


import random as r
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


# ## Poblando docentes

# In[111]:


print("[INFO] Poblando Docentes")
for a in docente:
    payload = {"idUsuario":str(a["id"])}
    #print(i,payload)
    sendHttp("http://localhost:3000/api/docente/crear","POST",json.dumps(payload))


# ## Poblando cursos

# In[112]:


df = pd.read_excel(path+"/Curso.xlsx")
df["idMateria"] = df["idMateria"].map(str)
df["horaFin"] = df["horaFin"].map(str)
df["horaInicio"] = df["horaInicio"].map(str)
print("[INFO] Poblando Curso")
curso = []
for ind in df.index:
    payload = {"id":df["id "][ind],"idMateria":df["idMateria"][ind],"idDocente":docente[r.randint(0,len(docente)-1)]["id"],"horaInicio":df["horaInicio"][ind],"horaFin":df["horaFin"][ind]}
    #print(payload)
    rs = sendHttp("http://localhost:3000/api/curso/crear","POST",json.dumps(payload))
    curso.append(rs)


# ## Poblanco alumnos

# In[113]:


import math as m
import random as r
print("[INFO] Poblando alumnos")


# In[114]:


curso = list(map(lambda x: json.loads(x), curso))


# In[115]:


NUM_CURSOS_ALUMNO = 5
#diferentes cursos
def getCurso(cursos,cuantos):
    cursos_alumno = []
    curso_aux = cursos.copy()
    while cuantos > 0 and len(curso_aux)>0:
        index = r.randint(0,len(curso_aux)-1)
        cursos_alumno.append({"id":curso_aux[index]["id"]})
        del curso_aux[index]
        cuantos -= 1
    return cursos_alumno


# In[116]:


sutiacion = [i for i in range(1,6)]
for a in alumno:
    payload = {"idUsuario":str(a["id"]),"idSituacionAcademica":sutiacion[r.randint(0,4)],"cursos":getCurso(curso, NUM_CURSOS_ALUMNO)}
    print(json.dumps(payload))
    sendHttp("http://localhost:3000/api/alumno/crear","POST",json.dumps(payload))


# ## Poblando admin

# In[117]:


print("[INFO] Poblando admin")
index = r.randint(0,len(docente)-1)
payload = {"idUsuario":str(docente[index]["id"])}
print("[INFO]adminEs:",docente[index])
#print(i,payload)
sendHttp("http://localhost:3000/api/docente/crear","POST",json.dumps(payload))


# ## poblando sala

# In[118]:


print("[INFO] Poblando Sala")


# In[ ]:





# In[119]:


#por cada curso hay 1 sala
sala = []
for cur in curso:
    cur_dic = cur
    payload = {"idCurso":str(cur_dic["id"])}
    rs = sendHttp("http://localhost:3000/api/sala/crear","POST",json.dumps(payload))
    sala.append(rs)


# In[ ]:





# ## Poblando Mensaje

# In[120]:


df = pd.read_excel(path+"/Mensaje.xlsx")


# In[121]:


sala = list(map(lambda x: json.loads(x), sala))
print("[INFO] Poblando mensaje")


# In[122]:


usuarios = list(map(lambda x:json.loads(x), usuarios))


# In[123]:


mensaje = []
for ind in df.index:
    for s in sala:
        payload = {"fechaEnviado":df["fechaEnviado"][ind],"texto":df["texto"][ind],"idSala":s["id"],"idAutor":usuarios[r.randint(0,len(usuarios)-1)]["id"]}
        #print(payload)
        rs = sendHttp("http://localhost:3000/api/mensaje/crear","POST",json.dumps(payload))
        mensaje.append((rs,s))


# ## Poblando  publicacion

# In[ ]:





# In[ ]:





# ## Poblando archivo

# In[ ]:





# In[ ]:




