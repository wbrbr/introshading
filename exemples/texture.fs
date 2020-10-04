in vec3 vPosition;
in vec3 vNormal;
in vec2 vTextureCoords;
uniform vec3 uLightDirection;
uniform vec3 uLightColor;
uniform sampler2D uWoodTexture;
            
void main() {
    vec3 finalColor = dot(vNormal, -uLightDirection) * texture(uWoodTexture, vTextureCoords).xyz;
    gl_FragColor = vec4(finalColor, 1.);
}