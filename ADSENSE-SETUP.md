# NAMERLY ADSENSE ACTIVATION GUIDE

## 🎯 CUANDO TENGAS ADSENSE APROBADO:

### 1. **Obtén tu Publisher ID**
- Ve a tu panel de AdSense
- Busca tu código de editor (empieza con `ca-pub-`)
- Ejemplo: `ca-pub-1234567890123456`

### 2. **Activa los anuncios**
Edita el archivo `assets/js/adsense-manager.js`:

```javascript
this.config = {
  // CAMBIA ESTO A true
  enabled: true,
  
  // PEGA TU ID REAL AQUÍ
  publisherId: 'ca-pub-TU-ID-REAL-AQUI',
  
  // Activa los anuncios que quieras
  adPlacements: {
    header: {
      enabled: true,  // Banner superior
      type: 'display',
      size: [728, 90],
      slot: 'TU-SLOT-ID'
    },
    afterResults: {
      enabled: true,  // Después de resultados (MÁS RENTABLE)
      type: 'display',
      size: [336, 280],
      slot: 'TU-SLOT-ID'
    },
    mobile: {
      enabled: true,  // Móviles
      type: 'display',
      size: [320, 50],
      slot: 'TU-SLOT-ID'
    },
    autoAds: {
      enabled: true   // Anuncios automáticos (RECOMENDADO)
    }
  }
};
```

### 3. **Activación rápida desde consola**
Si prefieres activar temporalmente:
```javascript
// En la consola del navegador:
enableAdSense('ca-pub-TU-ID-AQUI');
```

### 4. **Configuración de slots**
- Ve a AdSense → Anuncios → Por unidades de anuncio
- Crea unidades para cada tamaño:
  - **Banner superior**: 728x90
  - **Rectángulo tras resultados**: 336x280 (MÁS IMPORTANTE)
  - **Banner móvil**: 320x50
- Copia los data-ad-slot de cada uno

## 💰 ESTRATEGIA DE MONETIZACIÓN:

### **Ubicaciones más rentables:**
1. **Después de resultados AI** - Mayor engagement
2. **Banner superior** - Visibilidad alta
3. **Anuncios automáticos** - Optimización Google
4. **Móvil pegajoso** - Para usuarios móviles

### **Optimización:**
- El sistema está preparado para targeting por categorías
- Keywords optimizadas: 'name generator', 'viral content', 'social media'
- Responsive design incluido
- Compliance automático (etiquetas "Advertisement")

## 📊 ESTADO ACTUAL:
- ✅ **Sistema preparado** pero inactivo
- ✅ **Placeholders visibles** (solo para ti)
- ✅ **Estilos listos** y responsive
- ✅ **Scripts cargados** pero no ejecutan
- ✅ **Compliance ready** para revisión AdSense

## 🚀 VENTAJAS DE ESTA IMPLEMENTACIÓN:
- **No afecta velocidad** mientras no esté activo
- **AdSense verá preparación profesional** durante revisión
- **Activación instantánea** cuando aprueban
- **Optimizado para revenue** desde día 1
- **Mobile-first** para maximizar ingresos

¡Todo listo para monetizar en cuanto tengas aprobación! 💰
