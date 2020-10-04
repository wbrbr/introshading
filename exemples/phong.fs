in vec3 vPosition;
in vec3 vNormal;
uniform vec3 uLightDirection;
uniform vec3 uLightColor;
            
void main() {
    vec3 N = normalize(vNormal);
    vec3 L = normalize(uLightPos - vPosition);
    float kd = .6;
    float ks = .4;
    vec3 R = reflect(-L, N);
    vec3 V = normalize(vec3(0., 0., 2.) - vPosition);
    
    vec3 ambient = vec3(.1, 0., 0.);
    vec3 diffuse = kd * max(0., dot(N, L)) * vec3(1., 0., 0.);
    vec3 specular = ks * pow(max(0., dot(R, V)), 10.) * vec3(1.);
    vec3 finalColor = ambient + diffuse + specular;
    gl_FragColor = vec4(finalColor, 1.);
}